# Formgun

Fast & easy forms for the web.

## Installation

Formgun is a node.js module, you can install it with npm:

````npm install formgun````

## Usage

 Create a new form
````fgun create booking````

Add inputs
````fgun update booking --add input  --name email --type:string````
or by (shorter syntax):
````fgun update booking -a input -n email -t:string````

HTML containing the form is generated under ````./booking/````

## Documentation

Command pattern is: ````fgun {create/update}```` see below.

### create
Creates a new form. Form is generated under ````./{form-name}/```` directory.

### add
Adds an input to a form.

* name, name of input
* type, type of input (string)

## Contributing

PRs are welcome !
