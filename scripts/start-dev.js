import { spawn } from 'node:child_process';
import net from 'node:net';
import process from 'node:process';

const backendDir = 'SourceCode/backend';
const frontendDir = 'SourceCode/frontend';
const mavenRepoArg = '-Dmaven.repo.local=.m2/repository';

let backendProcess;
let frontendProcess;
let shuttingDown = false;

function runOnce(label, command, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`\n[${label}] ${command} ${args.join(' ')}`);
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: false,
      ...options,
    });

    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${label} exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

function ensureMysqlReady() {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host: '127.0.0.1', port: 3306 });
    socket.setTimeout(2500);
    socket.on('connect', () => {
      socket.end();
      resolve();
    });
    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error('MySQL localhost:3306 üzerinde cevap vermiyor. MySQL servisini başlatıp tekrar npm start çalıştırın.'));
    });
    socket.on('error', () => {
      reject(new Error('MySQL localhost:3306 üzerinde çalışmıyor. XAMPP/MAMP/MySQL servisini başlatıp tekrar npm start çalıştırın.'));
    });
  });
}

function pipeProcess(label, command, args, options = {}, onLine) {
  console.log(`\n[${label}] ${command} ${args.join(' ')}`);
  const child = spawn(command, args, {
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: false,
    ...options,
  });

  const handleChunk = (stream, chunk) => {
    const text = chunk.toString();
    stream.write(text);
    if (onLine) {
      text.split(/\r?\n/).filter(Boolean).forEach(onLine);
    }
  };

  child.stdout.on('data', (chunk) => handleChunk(process.stdout, chunk));
  child.stderr.on('data', (chunk) => handleChunk(process.stderr, chunk));

  child.on('exit', (code) => {
    if (!shuttingDown && code !== 0) {
      console.error(`[${label}] exited with code ${code}`);
      shutdown(1);
    }
  });

  return child;
}

function waitForBackendReady() {
  return new Promise((resolve) => {
    let resolved = false;
    backendProcess = pipeProcess(
      'backend',
      'mvn',
      [mavenRepoArg, 'spring-boot:run'],
      { cwd: backendDir },
      (line) => {
        if (!resolved && line.includes('Started OfRehberiApplication')) {
          resolved = true;
          console.log('\n[backend] Ready: http://localhost:8080');
          resolve();
        }
      }
    );
  });
}

function startFrontend() {
  frontendProcess = pipeProcess('frontend', 'npm', ['run', 'dev', '--', '--host', '0.0.0.0'], { cwd: frontendDir });
  console.log('\n[frontend] Vite linki birkaç saniye içinde yukarıda görünecek.');
  console.log('[app] Varsayılan adres: http://localhost:5173');
}

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log('\n[app] Kapatılıyor...');
  frontendProcess?.kill('SIGTERM');
  backendProcess?.kill('SIGTERM');
  setTimeout(() => process.exit(exitCode), 500);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

try {
  console.log('[app] MySQL bağlantısı kontrol ediliyor...');
  await ensureMysqlReady();
  console.log('[app] MySQL hazır: localhost:3306');

  console.log('[app] Backend derleniyor...');
  await runOnce('backend-build', 'mvn', [mavenRepoArg, '-q', '-DskipTests', 'package'], { cwd: backendDir });
  console.log('[app] Backend başarıyla derlendi.');

  await waitForBackendReady();
  startFrontend();
} catch (error) {
  console.error(`\n[app] Başlatma başarısız: ${error.message}`);
  shutdown(1);
}
