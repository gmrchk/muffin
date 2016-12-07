(function() {

    'use strict';

    var $input = document.querySelectorAll('[data-muffin]');
    var $form = document.querySelectorAll('form');

    // set validation on blur
    for ( var i = 0; i < $input.length; i++) {
        $input[i].addEventListener('blur', function (event) {
            var $inp = this;

            validate($inp);
        });
    }

    for ( var i = 0; i < $form.length; i++) {
        // no HTML5 validation
        $form[i].setAttribute('novalidate', '');

        // set validation on submit
        $form[i].addEventListener('submit', function (event) {
            var $validate = document.querySelectorAll('[data-muffin]');

            var valid = true;
            $validate.forEach(function ($inp) {
                if(!validate($inp)) {
                    valid = false;
                }
                if(!valid) {
                    event.preventDefault();
                }
            });
        });
    }

    /**
     * validate input based on it's data attributes
     * @param $inp - html input or textarea
     * @returns {boolean} - valid or not
     */
    function validate ($inp) {
        var validation = JSON.parse($inp.dataset.muffin);
        var validationCustom = $inp.dataset.muffinCustom;
        var validationMessage = $inp.dataset.muffinMessage;
        var valid = true;

        // required
        if (validation.required != null) {
            if ($inp.value == "") {
                createError($inp, validation.required);
                $inp.parentElement.classList.add('input--error');
                valid = false;
            } else {
                removeError($inp);
                $inp.parentElement.classList.remove('input--error');
                valid = true;
            }
        }

        // email
        if (validation.email != null) {
            if ($inp.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) {
                createError($inp, validation.email);
                $inp.parentElement.classList.add('input--error');
                valid = false;
            } else {
                removeError($inp);
                $inp.parentElement.classList.remove('input--error');
                valid = true;
            }
        }

        // custom
        if (validationCustom != null) {
            validationCustom = getRegFromString(validationCustom);

            if (!validationCustom.test($inp.value)) {
                createError($inp, validationMessage);
                $inp.parentElement.classList.add('input--error');
                valid = false;
            } else {
                removeError($inp);
                $inp.parentElement.classList.remove('input--error');
                valid = true;
            }
        }

        return valid;
    }

    /**
     * Creates error
     * @param elem - input element
     * @param text - error text
     */
    function createError(elem, text) {
        // check if error already exists
        if (elem.parentElement.querySelector('.input__error') == null) {
            var err = document.createElement("label");
            err.innerHTML = text;
            err.classList.add('input__error');
            elem.parentElement.appendChild(err);
        }
    }

    /**
     * Remove error
     * @param elem - input element
     */
    function removeError(elem) {
        // check if error exists
        if (elem.parentElement.querySelector('.input__error') != null) {
            var err = elem.parentElement.querySelector('.input__error');
            err.outerHTML = "";
        }
    }

    /**
     * Get regex
     * @param string - string version of regex
     * @returns {RegExp} - regex
     */
    function getRegFromString(string){
        var a = string.split("/");
        var modifiers = a.pop(); a.shift();
        var pattern = a.join("/");
        // error handling for regex without modifier
        if (modifiers == "") {
            modifiers = i;
        }
        return new RegExp(pattern, modifiers);
    }
})();