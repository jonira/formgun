# Formgun

Fast & easy forms for the web.

## Installation

Formgun is a node.js module, you can install it with npm:

````npm install formgun````

## Usage

* Create a new form
````fgun create booking````

* Add some inputs
````fgun update booking --add input --name email --type string````

* Host it
````fgun host booking ````
Form will be hosted at http://localhost:3000.

### NB
shorter syntax is also supported:
````fgun update booking -a input -n email -t string````

HTML containing the form is generated under ````./booking/````

## Documentation

Command pattern is: ````fgun {create/update/host} {form-name}```` see below.

### create
Creates a new form. Form is generated under ````./{form-name}/```` directory.

### update
Update form.

* ````--add, -a ```` adds to form. Possible values: ````input````

####  adding input (````--add input````):
* ````--name, -n```` name of input
* ````--type, -t```` type of input (html5 input types)

### host
Hosts the form at http://localhost:3000. Submitted form data is saved under ````./{form-name}/formData.csv````

## License

Licensed under Apache V2

## Contributing

PRs are welcome !
