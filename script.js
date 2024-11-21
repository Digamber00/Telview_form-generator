// Get references to the editor and form output elements
const jsonEditor = document.getElementById('json-editor');
const formOutput = document.getElementById('form-output');

//  this Function is to generate a form from the JSON schema...
function generateForm(schema) {
  
  formOutput.innerHTML = '';

  const form = document.createElement('form');

  schema.fields.forEach(field => {
    const label = document.createElement('label');
    label.textContent = field.label || field.name;

    let input;

    if (field.type === 'select') {
      input = document.createElement('select');
      field.options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        input.appendChild(opt);
      });
    } else {
      input = document.createElement('input');
      input.type = field.type || 'text';
    }

    input.name = field.name;
    if (field.placeholder) input.placeholder = field.placeholder;
    if (field.required) input.required = true;

    form.appendChild(label);
    form.appendChild(input);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  form.appendChild(submitButton);

  formOutput.appendChild(form);
}

// this will be the Event listener for real-time updates
jsonEditor.addEventListener('input', () => {
  try {
    const schema = JSON.parse(jsonEditor.value);
    generateForm(schema);
  } catch (error) {
    formOutput.innerHTML = '<p style="color: red;">Invalid JSON. Please fix the syntax.</p>';
  }
});
