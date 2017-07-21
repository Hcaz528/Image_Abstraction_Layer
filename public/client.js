const textField = document.querySelector('input[type=text]');

document.querySelector('button[data-getthis=latest]').addEventListener('click', (e) => {
  e.preventDefault();
  
  fetch('/api/v1/latest', {
    method: "GET"
  })
    .then( blob => {
    return blob.json();
  })
    .then( data => {
    
    data = Object
      .values( data )
      .map(function( d ){
      console.log(d);
        return `<li class="latest" onclick='popit(this)'>${d.name}</li>`;
        
      })
      .join('');
    
    document.querySelector('ul#images').innerHTML = data;
  });
})

function popit(_this) {
  textField.value = _this.textContent;
}

// PURE VANILLA JS
document.querySelector('form').addEventListener('submit', (e) => {
  console.log(this);
  e.preventDefault();
  fetch(`/api/v1/imagesearch/${textField.value}`, {
    method: "POST"
  })
    .then( blob => {
    return blob.json();
  })
    .then( data => {
    
    data = Object
      .values( data )
      .map(function( d ){
        if((d.link).includes(d.type)) {
          return `<a target='_blank' href=${(d.link).replace(d.type,'').replace('http','https')}><li><img src=${d.link.replace('http','https')}></li></a>`;
        } else {
          return `<a target='_blank' href=${(d.link).replace('http','https')}><li>${d.searchTerm}</li></a>`;
        }
      })
      .join('');
    
    document.querySelector('ul#images').innerHTML = data;
  });
});