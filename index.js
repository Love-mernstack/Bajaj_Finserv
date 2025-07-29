const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT =3000;
app.use(bodyParser.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.on('finish', () => {
    console.log(`Status Code: ${res.statusCode}`);
  });
  next();
});

app.post("/bfhl", (req, res) => {
  const { data } = req.body;
 const email = "kashish1769.be22@chitkara.edu.in"; 
  const user_id = "kashish_mukheja_22012005";
  const roll_number = "2210991769"; 


    let sp_char = [];
     let sum = 0;
  let odds = [];
  let evens = [];
  let concats = "";
  let alphabets = [];
  

  data.forEach(val => {
    if (!isNaN(val)) {
      const num = parseInt(val);
      if (num % 2 === 0) {
        evens.push(val);
      } else {
        odds.push(val);
      }
      sum += num;
    } else if (/^[a-zA-Z]+$/.test(val)) {
      alphabets.push(val.toUpperCase());
      concats += val;
    } else {
      sp_char.push(val);
    }
  });

  const reverseC = concats.split("").reverse();
  let concat_string = reverseC.map((ch, idx) =>
    idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
  ).join("");

  res.status(200).json({
    is_success: true,
    user_id,
    email,
    roll_number,
    odds,
    evens,
    alphabets,
    sp_char,
    sum: sum.toString(),
    concat_string
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
