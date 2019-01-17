const getData = data => (data.length <= 50 ? [...data] : data.slice(0, 50));

export default getData;
