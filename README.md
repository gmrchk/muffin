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
Long story short, input must be placed into wrapper with a class *input*, and error messages append with class *input__error* while adding *input--error* class to wrapper.

## Usage
Validation is attached to any input with *data-muffin* attribute, where options are passed in JSON format.

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
Two data attributes are used for that - data-custom (for regex) and data-message (for the error message).
Example for only allowing numbers:
```html
<div class="input">
    <input type="email" name="email" id="email" data-muffin='{"required":"This input is required"}' data-muffin-custom='/^\\d+$/i' data-muffin-message="Only numbers allowed"/>
</div>
```
*Note:* Dont forget to have both, pattern and modifier in there (/pattern/modifier), otherwise modifier is set to i by default.
*Note:* Regex must be double escaped when embeding in string (/^\\d+$/i).