import React, {useState, useEffect} from 'react';

function App() {

  const [currencyValue, setCurrencyValue] = useState(1);
  const [currency1, setCurrency1] = useState('BYN');
  const [currency2, setCurrency2] = useState('USD');
  const [rate, setRate] = useState([]);

  const CURRENCIES_ABBR = ['ILS', 'INR', 'KRW', 'NGN', 'THB', 'VND', 'LAK', 'KHR', 'MNT', 'PHP', 'IRR', 'CRC', 'PYG', 'AFN', 'GHS', 'KZT', 'TRY', 'AZN', 'GEL', 'PLN'];
  const SELECT_STYLE = {
    width: "168px"
  }

  const getRate = (currency1, currency2) => {

      fetch(`https://free.currconv.com/api/v7/convert?q=${currency1}_${currency2}&compact=ultra&apiKey=02079225ec2665c78006`)
        .then(response => response.json())
        .then(result => {
          setRate(Object.values(result));
        },

        error => {
          console.log(error.name);
        })

  }

  useEffect(() => getRate(currency1, currency2), [currency1, currency2])


  return (
    <div style={{display: 'flex', width: "100%", marginTop: "100px", justifyContent: "center", alignItems: "center", fontSize: "24px"}}>
      <div style={{
        width: '650px',
        height: '250px',
        border: "1px solid black",
        borderRadius: "3%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <h3 style={{margin: 0}}>Simple Currency Converter</h3>
      <span style={{marginTop: "40px"}}>{currencyValue} {currency1} = {(currencyValue * rate).toFixed(4)} {currency2}</span>
      <br />
      <div style={{width: "100%", display: "flex", justifyContent: "space-around"}}>
        <input type='text' value={currencyValue} onChange={(e) => setCurrencyValue(e.target.value)} id="currency_input" />
        <select value={currency1} id='currencies1' name='currencies1' onChange={(e) => setCurrency1(e.target.value)} style={SELECT_STYLE}>
          <option value="USD">USD</option>
          <option value="BYN">BYN</option>
          <option value="UAH">UAH</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
          <option value="RUB">RUB</option>
          <optgroup label='Other Currencies'>
          {CURRENCIES_ABBR.map((item) => <option key={item} value={item}>{item}</option>)}
          </optgroup>
        </select>
        <select value={currency2} id='currencies2' name='currencies2' onChange={(e) => setCurrency2(e.target.value)} style={SELECT_STYLE}>
        <option value="USD">USD</option>
          <option value="BYN">BYN</option>
          <option value="UAH">UAH</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
          <option value="RUB">RUB</option>
          <optgroup label='Other Currencies'>
          {CURRENCIES_ABBR.map((item) => <option key={item} value={item}>{item}</option>)}
          </optgroup>
        </select>
      </div>
      </div>

    </div>
  );
}

export default App;
