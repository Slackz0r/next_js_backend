import * as jose from "jose";

const JWT_SECRET = "SECRET";
const JWT_AUTH_EXP = "7d";

let encodedSecret = () => {
  return new TextEncoder().encode(JWT_SECRET);
};

export const signJWT = async (payload) => {
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(JWT_AUTH_EXP)
    .sign(encodedSecret());

  return token;
};

export const verifyJWT = async (token) => {
  const verified = await jose.jwtVerify(token, encodedSecret());

  return verified.payload;
};

export async function validateJSONData(req) {
  let body;
  try {
    body = await req.json(); // Parse incoming data to json
    return [false, body];
  } catch (error) {
    return [true, null];
  }
}
