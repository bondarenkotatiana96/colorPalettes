import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import styles from './styles/ColorPickerStyles';

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "teal",
            newColorName: ""
        };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value => 
            this.props.colors.every(({name}) => name.toLowerCase() !== value.toLowerCase())
        );
        ValidatorForm.addValidationRule("isColorUnique", value => 
            this.props.colors.every(({color}) => color !== this.state.currentColor)
        );
    }
    updateCurrentColor(newColor) {
        this.setState({currentColor: newColor.hex});
      }

      handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
      }

      handleSubmit() {
        const newColor = {color: this.state.currentColor, name: this.state.newColorName};
        this.props.addNewColor(newColor);
        this.setState({newColorName:""});
      }
    render() {
        const { paletteIsFull, classes } = this.props;
        const {currentColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker 
                color={currentColor} 
                onChangeComplete={this.updateCurrentColor}
                className={classes.picker}
            />
            <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                <TextValidator
                   value={newColorName}
                   className={classes.colorNameInput}
                   name="newColorName"
                   variant="filled"
                   margin="normal"
                   placeholder="Color Name"
                   onChange={this.handleChange}
                   validators={["required", "isColorNameUnique", "isColorUnique"]}
                   errorMessages={["*this field is required", "*color name must be unique", "*color already used"]}
                />
                <Button 
                variant="contained" 
                color="primary"
                style={{backgroundColor: paletteIsFull ? "grey" : currentColor}}
                type="submit"
                className={classes.addColor}
                disabled={paletteIsFull}>
                {paletteIsFull ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPicker);