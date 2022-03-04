import {NextApiRequest, NextApiResponse} from "next";
import {firebaseAdmin} from "../../configurations/firebaseadmin.config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = await firebaseAdmin.auth().verifyIdToken(req.query.token as string)

    const { uid } = token;

    const user = await firebaseAdmin.auth().getUser(uid)
    const role = user.customClaims?.role

    res.status(200).json({
      uid: uid,
      role: role
    })

  } catch (e) {
    res.status(200).json({})
  }
}