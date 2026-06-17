const { cert, initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("./ofrehberi-93567-firebase-adminsdk-fbsvc-eb0007acf6.json");

initializeApp({
  credential: cert(serviceAccount),
});

async function removeAdmin(email) {
  if (!email) {
    throw new Error("Kullanım: node remove-admin.js kullanici@mail.com");
  }

  const auth = getAuth();
  const user = await auth.getUserByEmail(email);
  const current = user.customClaims || {};
  await auth.setCustomUserClaims(user.uid, { ...current, admin: false });
  console.log("✅ admin=false set for", email, "uid:", user.uid);
  console.log("Now sign out and sign back in (or refresh token).");
}

removeAdmin(process.argv[2]).catch((error) => {
  console.error(error);
  process.exit(1);
});
