let customers = [
  { id: 1, name: 'moe', email: 'moe@gmail.com', isVIP: true},
  { id: 2, name: 'larry', isVIP: true, email: 'larry@gmail.com'},
  { id: 4, name: 'shep', email: 'shep@gmail.com'},
];

const state = {
  customers,
  errors : {
    name: null,
    email: null
  }
};

const customersContainer = document.querySelector('#customersContainer');
const customerForm = document.querySelector('#customerForm');

const nameInput = customerForm.querySelector('[name="name"]');
const emailInput = customerForm.querySelector('[name="email"]');
const isVIPInput = customerForm.querySelector('[name="isVIP"]');
const errorList = customerForm.querySelector('#errors');
const createButton = customerForm.querySelector('#createButton');

const renderErrors = ()=> {
  errorList.innerHTML = '';
  Object.keys(state.errors).forEach( key => {
    if(state.errors[key]){
      errorList.innerHTML += `<li>${state.errors[key]}</li>`;
    }
  });
};

nameInput.addEventListener('keyup', (ev)=> {
  if(!ev.target.value){
    state.errors.name = 'name required';
  }
  else {
    state.errors.name = '';
  }
  renderErrors();
  checkValidity();
});

emailInput.addEventListener('keyup', (ev)=> {
  if(!ev.target.value){
    state.errors.email = 'email required';
  }
  else if(ev.target.value.indexOf('@') === -1){
    state.errors.email = 'email must contain an @';
  }
  else {
    state.errors.email = '';
  }
  renderErrors();
  checkValidity();
});

const checkValidity = ()=> {
  if(emailInput.value && emailInput.value.indexOf('@') !== -1 && nameInput.value){
    createButton.removeAttribute('disabled');
  }
  else {
    createButton.setAttribute('disabled', 'disabled');
  }
};

customerForm.addEventListener('submit', (ev)=> {
  ev.preventDefault();
  const nameInput = customerForm.querySelector('[name="name"]');
  const emailInput = customerForm.querySelector('[name="email"]');
  const isVIPInput = customerForm.querySelector('[name="isVIP"]');
  state.customers.push({
    name: nameInput.value,
    email: emailInput.value,
    isVIP: isVIPInput.checked,
    id: Math.random()
  });
  nameInput.value = '';
  emailInput.value = '';
  isVIPInput.checked = false;
  checkValidity();
  renderCustomers();
});

customersContainer.addEventListener('click', (ev)=> {
  const id = ev.target.getAttribute('data-id');
  if(!id){
    return;
  }
  state.customers = state.customers.filter( customer => customer.id !== id*1);
  renderCustomers();
});


const renderCustomers = ()=> {
  const html = state.customers.map( customer => `
    <div class="customer${ customer.isVIP ? ' vip': ''}">
      <h3>
      ${ customer.name }
      (${ customer.email })
      </h3>
      <button data-id=${customer.id}>Destroy</button>
    </div>
  `).join('');
  customersContainer.innerHTML = `<div class='status'>${ state.customers.filter( customer => customer.isVIP).length } VIPS</div>${html}`
};

renderCustomers();
