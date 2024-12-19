const API_URL = 'http://127.0.0.1:8000/translate/';

export const translateText = async (text, srcLang, destLang) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      src_lang: srcLang,
      dest_lang: destLang,
    }),
  });

  const result = await response.json();
  return result;
};
