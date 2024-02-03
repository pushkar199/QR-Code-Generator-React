// import { useState } from 'react';
// import QRCode from 'react-qr-code';

// function App() {

//   const [url,seturl] = useState("");
//   const [renderTask, setRenderTask] = useState(null);
//   const size = 300

//   const generatebar = ()=>{
//     if(url.length>0){
//       document.querySelector(".downbtn").style.display = "inline-block"
//       setRenderTask(<div className="barcodeContainer"><QRCode className='barcodeimage' value={url} size={size} /></div>)
//     }
//     else{
//       setRenderTask(<h3>Enter Some text for the Barcode...</h3>)
//       document.querySelector(".downbtn").style.display = "none"
//     }
//   }

//   const downloadQRCode = () => {
//     window.print();
//   };

  
//   return (
//     <>
//       <div className="GeneratorContainer">
//         <div className="qrcodeContainer">
//         <div className="inputContainer">
//           <input 
//             type="text" 
//             name="barcode"  
//             placeholder='https://www.google.com'
//             value={url}
//             onChange={(e)=>seturl(e.target.value)}
//             autoFocus
//           />
//           <button onClick={generatebar}>Generate</button>
//         </div>
        
//         {
//           renderTask
//         }
        
//         <center><button className='downbtn' onClick={downloadQRCode}>Print QR Code</button></center>
//         </div>
//       </div>
//     </>
//   )
// }

// export default App
// // react pdf renderer
// // react confetti
// // swiper.js
// // web.dev/measure 










import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import domtoimage from 'dom-to-image';

function App() {
  const [url, setUrl] = useState("");
  const [renderTask, setRenderTask] = useState(null);
  const qrCodeRef = useRef(null);
  const size = 300;

  const generateQRCode = () => {
    if (url.length > 0) {
      setRenderTask(
        <div className="barcodeContainer">
          <QRCode className='barcodeimage' value={url} size={size} />
        </div>
      );
      document.querySelector(".downbtn").style.display = "inline-block";
      document.querySelector(".printbtn").style.display = "inline-block"; // Added this line
    } else {
      setRenderTask(<h3>Enter some text for the QR Code...</h3>);
      document.querySelector(".downbtn").style.display = "none";
      document.querySelector(".printbtn").style.display = "none"; // Added this line
    }
  };

  const downloadQRCode = () => {
    domtoimage.toPng(qrCodeRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qrcode.png';
        link.click();
      })
      .catch((error) => console.error('Error generating QR Code image:', error));
  };

  const printQRCode = () => {
        window.print();
      };

  return (
    <>
      <div className="GeneratorContainer">
        <div className="qrcodeContainer">
          <div className="inputContainer">
            <input
              type="text"
              name="barcode"
              placeholder='https://www.google.com'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus
            />
            <button onClick={generateQRCode}>Generate</button>
          </div>

          <div ref={qrCodeRef}>
            {renderTask}
          </div>

          <center>
            <button className='downbtn' onClick={downloadQRCode}>
              Download QR Code
            </button>
          </center>
          <center>
            <button className='printbtn' onClick={printQRCode}>
              Print QR Code
            </button>
          </center>
        </div>
      </div>
    </>
  );
}

export default App;
