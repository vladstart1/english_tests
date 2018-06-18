import React, { Component } from 'react';
import styles from './question_item.css';

class Checkbox extends Component {
    state = {
        isChecked: false,
      }
    
      toggleCheckboxChange = () => {
        const { handleCheckboxChange, label } = this.props;
    
        this.setState(({ isChecked }) => (
          {
            isChecked: !isChecked,
          }
        ));
    
        handleCheckboxChange(label);
      }
    
      render() {
        const { label } = this.props;
        const { isChecked } = this.state;
    
        return (
          <div className={styles.checkbox}>
            <label>
              <input
                                type="checkbox"
                                value={label}
                                checked={isChecked}
                                onChange={this.toggleCheckboxChange}
                            />
    
              {label}
            </label>
          </div>
        );
      }
    }

export default Checkbox;