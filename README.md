# Muffin - form validation
Simple standalone javascript form validation

## Introduction
Muffin is based on [BEM](https://en.bem.info/methodology/) css methodology, so the model for using thin validation looks like this:

```html
<div class="input">
    <input type="email" name="email" id="email"/>
</div>
```
and when error is added:
```html
<div class="input input--error">
    <input type="email" name="email" id="email" />
    <label for="email" class="input__error">Some error message</label>
</div>
```
Long story short, input must be placed into wrapper with a class `input`, and error messages append with class `input__error` while adding `input--error` class to wrapper. Attrbute *for* of label is also automatically set to id of input. Validation is triggered on blur of input or attempt to submit the form. 

## Usage
Validation is attached to any input with __data-muffin__ attribute, where options are passed in JSON format.

### Required
Requred input would be:
```html
<div class="input">
    <input type="email" name="email" id="email" data-muffin='{"required":"This input is required"}'/>
</div>
```
where value of required property is an error message displayed for empty input

### Email
Required input with email formatting would be:
```html
<div class="input">
    <input type="email" name="email" id="email" data-muffin='{"required":"This input is required", "email": "Must be email bro"}'/>
</div>
```
where value of email property is an error message displayed for wrong email format.

### Custom
Validation has also custom options, where regex can be placed for validating.
Two data attributes are used for that - `data-custom` (for regex) and `data-message` (for the error message).
Example for only allowing numbers:
```html
<div class="input">
    <input type="text" name="number" id="number" data-muffin='{"required":"This input is required"}' data-muffin-custom='/^\\d+$/i' data-muffin-message="Only numbers allowed"/>
</div>
```
__Note:__ Dont forget to have both, pattern and modifier in regex (/pattern/modifier), otherwise modifier is set to __i__ by default.

__Note:__ Regex must be double escaped when embedding in string (/^\\\d+$/i).
