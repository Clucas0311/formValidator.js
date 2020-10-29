// Grab the dom elements that we need..
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// Show input Error messages
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
}

// Show success outline
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
// Check required fields
function checkRequired(inputArr) {
	inputArr.forEach((input) => {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
}

// check input length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(input, `${getFieldName(input)} must be at least ${min}`);
	} else if (input.value.length > max) {
		showError(input, `${getFieldName(input)} must be less than ${max}`);
	} else {
		showSuccess(input);
	}
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
	if (input1.value !== input2.value) {
		showError(input2, 'Passwords do not match');
	}
}

//  Get fieldname
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// Check email is valid
function checkEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(email.value.trim())) {
		showSuccess(email);
	} else {
		showError(email, 'Email is not valid');
	}
}

// Event listeners
form.addEventListener('submit', function(e) {
	e.preventDefault();

	checkRequired([ username, email, password, password2 ]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
});
