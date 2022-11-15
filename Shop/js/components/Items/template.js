export default function (items) {
    return `<div class="product row border-top border-bottom">
    <div class="row main align-items-center" data-id="${ items.id }">
      <div class="col-2">
        <img
          class="img-fluid"
          src="${items.image}"
        />
      </div>
      <div class="col">
        <div class="row text-muted">${items.category}</div>
        <div class="row">${items.name}</div>
      </div>
      <div class="col">
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div class="col" id="somme">&euro; <span></span></div>
      <div>
        <a href="#">
          <i class="destroy fa-solid fa-circle-xmark"></i>
        </a>
      </div>
    </div>
    </div>
  `
}