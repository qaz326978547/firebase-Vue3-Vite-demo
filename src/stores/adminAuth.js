import { initializeApp, credential as _credential, auth as _auth } from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

initializeApp({
    credential: _credential.cert(serviceAccount),
    databaseURL: "https://fir-demo-40c82-default-rtdb.firebaseio.com"
    // 其他配置参数...

});

const setAdmin = async (uid) => {
    const auth = _auth();
    const claims = {
        admin: true,
    };

    try {
        await auth.setCustomUserClaims(uid, claims);
        console.log('User permissions updated successfully');
    } catch (error) {
        console.error('Failed to update user permissions:', error);
    }
};

export default { setAdmin };
