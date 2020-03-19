export default function() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const fail = Math.random() < 0.1;

      if (fail) {
        rej("Failed");
      } else {
        fetch(`https://dog.ceo/api/breeds/image/random`)
          .then(data => data.json())
          .then(data => {
            console.log(data);
            res(data);
          });
      }
    }, 1000);
  });
}
