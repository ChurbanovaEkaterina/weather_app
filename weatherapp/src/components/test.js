<div>{
  allcities.map((item, i) => {
    let arr = []
    const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'aa7c5eda80msh0c8392bc75a3a95p19bbf7jsn8b53ecb924e7',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  const results=fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${item.weather_city}&days=5`, options)
    .then(response => response.json())
    .then(data=>{
        console.log('data',data)
        arr.push(data)
      })
    .catch(err => console.error(err));
    console.log('arr',arr)
    console.log('arr[0]',arr[0])
    return(
      <div><div>Hello</div></div>
    )
  })
}</div>
