const { cert, initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("./ofrehberi-93567-firebase-adminsdk-fbsvc-eb0007acf6.json");

initializeApp({
  credential: cert(serviceAccount),
});

async function makeAdmin(email, password) {
  if (!email) {
    throw new Error("Kullanım: node make-admin.js kullanici@mail.com [sifre]");
  }

  const auth = getAuth();
  let user;
  try {
    user = await auth.getUserByEmail(email);
  } catch (error) {
    if (error.code !== "auth/user-not-found") {
      throw error;
    }
    if (!password) {
      throw new Error(
        `${email} Firebase Authentication içinde yok. Önce /giris ekranından kayıt ol veya komutu şifreyle çalıştır: node make-admin.js ${email} Sifre1234`
      );
    }
    user = await auth.createUser({
      email,
      password,
      emailVerified: true,
    });
    console.log("Firebase kullanıcısı oluşturuldu:", email, "uid:", user.uid);
  }

  const current = user.customClaims || {};
  await auth.setCustomUserClaims(user.uid, { ...current, admin: true });
  console.log("✅ admin=true set for", email, "uid:", user.uid);
  console.log("Now sign out and sign back in (or refresh token).");
}

makeAdmin(process.argv[2], process.argv[3]).catch((error) => {
  console.error(error);
  process.exit(1);
});
