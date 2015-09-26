# Formgun

Fast & easy forms for the web.

## Installation

````npm install formgun````

## Usage

**Step 1:**

 Create a new form


````formgun create myform````


**Step 2:**

Add inputs
````formgun add name into myform --type:string --validator:length<5````

**Step 3:**

Profit. HTML containing the form is generated under ````/forms/myForm````


## Documentation

Command pattern is: ````formgun {create/add/host}```` see below.

### create
Creates a new form. Form is generated under ````./forms/```` directory.

* submit_url
* submit_text
* succ_msg
* err_msg

### add
Adds an input to a form.

* name
* type
* validator

### host
Hosts a form.


## Contributing

Feel free to hack away :) PRs, issues are welcome !
