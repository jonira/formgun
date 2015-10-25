# Formgun

Fast & easy forms for the web.

## Installation

Formgun is a node.js module, you can install it with npm:

````npm install formgun````

## Usage

* Create a new form
````fgun create booking````

* Add some inputs
````fgun update booking --add input  --name email --type:string````

shorter syntax is also supported:
````fgun update booking -a input -n email -t:string````

HTML containing the form is generated under ````./booking/````

## Documentation

Command pattern is: ````fgun {create/update}```` see below.

### create
Creates a new form. Form is generated under ````./{form-name}/```` directory.

### update
Update form.

* ````--add, -a ```` adds to form. Possible values: ````input````

####  adding input (````--add input````):
* ````--name, -n```` name of input
* ````--type, -t```` type of input (html5 input types)

## License

Licensed under Apache V2

## Contributing

PRs are welcome !
