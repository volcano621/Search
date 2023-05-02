const json =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6";
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const all = [];
fetch(json)
  .then((response) => response.json())
  .then((data) => all.push(...data));

function match(required, all) {
  return all.filter((place) => {
    let regexp = new RegExp(required, "gi");
    return place.city.match(regexp) || place.state.match(regexp);
  });
}

input.addEventListener("keyup", function () {
  let matchArray = match(this.value, all);
  let html = matchArray
    .map((place) => {
      const regexp = new RegExp(this.value, "gi");
      const cityname = place.city.replace(
        regexp,
        `<span class=highlight>${this.value}</span>`
      );
      const statename = place.state.replace(
        regexp,
        `<span class=highlight>${this.value}</span>`
      );
      return `
    <li>
    <span class="city">${cityname},${statename}</span>
    <span class="population">${place.population}</span>
    </li>`;
    })
    .join(" ");
  ul.innerHTML = html;
});
