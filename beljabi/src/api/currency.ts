import axios from "axios";

export async function getCurrencyConvert(from: string, to: string, amount: number) {
    const response = await axios({
        method: 'GET',
        url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
        params: {format: 'json', from, to, amount},
        headers: {
            'x-rapidapi-key': '99410e8506msh3a6e72c6b3c187fp118ab5jsnfe3464e8b3e5',
            'x-rapidapi-host': 'currency-converter5.p.rapidapi.com'
        }
    })
  
    return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}