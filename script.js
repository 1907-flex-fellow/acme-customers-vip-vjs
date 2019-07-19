// put data into state like react does
const state = {
    customers: [],
    errors: []
}

const customersList =  document.querySelector('#customers-list')
const form = document.querySelector('#customers-form')
form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const id = Math.random();
    let name = document.querySelector('#nameInput').value;
    let email = document.querySelector('#emailInput').value;
    let isVip = document.querySelector('#ISVIP').checked;
    let nameError = checkName(name);
    let emailError = checkEmail(email);
    if (!nameError && !emailError){
        customer = {id, name, email};
        state.customers.push(customer);
    }else{
        state.errors.push(checkName(name));
        state.errors.push(checkEmail(email));
    }
    console.log('state: ', state);
    console.log('isvip: ', isVip)
    name = '';
    email = '';
    nameError = '';
    emailError = '';    
    renderCustomers();
    renderErrors();
})

function checkName(name){
    if(name == ""){
        return 'name can not be empty';
    }else{
        return '';
    }
}

function checkEmail(email){
    if(email == ""){
        return 'email can not be empty';
    }else{
        return '';
    }
}

customersList.addEventListener('click', ev => {
    const id = ev.target.getAttribute('data-id');
    console.log('id: ', id)
    if(!id){
        return
    }else{
        state.customers = state.customers.filter(customer => customer.id !== id*1)
    }
    console.log('state.customers: ', state.customers)
    renderCustomers()
})

function renderCustomers(){
    const customersList = document.querySelector('#customers-list');
    const customerHtml =  state.customers.map( customer => {
        return (
            `<li>${customer.name}<br/>${customer.email}<br><button data-id=${customer.id}>Destroy</button><li>`
        )
    }).join('')
    customersList.innerHTML = customerHtml
}

function renderErrors(){
    const errorHtml = state.errors.map(error => {
        return (
            `<li>${error}</li>`
        )
    }).join('')
    const ErrorList = document.querySelector('#errors-list');
    ErrorList.innerHTML = errorHtml;
}

renderCustomers();