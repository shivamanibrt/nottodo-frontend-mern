export const reandmonStrGenerator = (length) => {
  let str = "";

  const strcollection = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";

  for (let i = 0; i < length; i++) {
    const charPosition = Math.round(Math.random() * strcollection.length);

    str += strcollection[charPosition];
  }

  return str;
};
