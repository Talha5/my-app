import React, { useState, useEffect } from 'react';
import { DiverstTranslaty } from 'diverst-translaty';

function HomePage() {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [result, setResult] = useState('');
  const [formSubmit, setFormSubmit] = useState(false);

  const handleChange = (newValue) => {
    setTargetLanguage(newValue);
  };

  const handleButtonClick = () => {
    console.log("****************************************************************Fetching translated data...", textToTranslate, targetLanguage);
    setFormSubmit(true);
    let client = new DiverstTranslaty(process.env.REACT_APP_GOOGLE_PROJECT_ID, process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY);
    if(targetLanguage === 2){
      setFormSubmit(false);
      return;
    }
    client.translate(textToTranslate, targetLanguage)
    .then((response) => {
      setResult(response[0]);
      setFormSubmit(false);
    })
    .catch((err) => {
      setFormSubmit(false);
      console.log("Error: ", err);
    })
  };

  useEffect(() => {
    setTimeout(() => {
      handleChange(2)
    }, 1500)
  }, []);

  return(
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="antialiased text-gray-900 px-6">
          <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
            <h2 className="text-2xl font-bold">Translate Text</h2>
            <div className="mt-8 max-w-md">
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-gray-700">Text to Translate</span>
                  <input type="text"
                         onChange={e => setTextToTranslate(e.target.value)}
                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                </label>
                <label className="block">
                  <span className="text-gray-700">Target language(text to be translated into)</span>
                  <select onChange={(e) => handleChange(e.target.value)} value={targetLanguage}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="DEFAULT">Choose a language ...</option>
                    <option value='de'>German</option>
                    <option value='fr'>French</option>
                    <option value='ja'>Japanese</option>
                    <option value='zh'>Chinese</option>
                  </select>
                </label>
                <div className="block">
                  <div className="mt-2">
                    <div>
                      <label className="inline-flex items-center">
                        <p className="result">Translated Text: </p>
                        <p className="text-green-700">{result}</p>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="block">
                  <button disabled={formSubmit} className="mr-5 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg" onClick={() => handleButtonClick()}>
                    {formSubmit === true ? 'Loading...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
