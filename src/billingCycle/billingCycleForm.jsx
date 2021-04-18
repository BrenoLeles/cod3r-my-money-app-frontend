import React, {Component} from 'react';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {FORM_BILLING_CYCLES, init} from "./billingCycleActions";
import labelAndInput from "../common/form/labelAndInput";
import ItemList from './itemList.jsx';
import Summary from './summary';

class BillingCycleForm extends Component {
	constructor(props) {
		super(props);
	}
	
	calculateSummary() {
		const sum = (t, v) => t + v;
		
		return  {
			sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
			sumOfDebts: this.props.debts.map(c => +c.value || 0).reduce(sum)
		}
	}
	
	render() {
		
		const {handleSubmit, readOnly, credits, debts} = this.props;
		const { sumOfCredits, sumOfDebts } = this.calculateSummary()
		
		return (
			 <form role='form' onSubmit={handleSubmit}>
				 <div className="box-body">
					 <Field name='name' component={labelAndInput} readOnly={readOnly}
					        label='Nome' cols='12 4' placeholder='Informe o nome'/>
					 <Field name='month' component={labelAndInput} type='number' readOnly={readOnly}
					        label='Mês' cols='12 4' placeholder='Informe o mês'/>
					 <Field name='year' component={labelAndInput} type='number' readOnly={readOnly}
					        label='Ano' cols='12 4' placeholder='Informe o ano'/>
		        <Summary credit={sumOfCredits} debt={sumOfDebts} />
					 <ItemList cols='12 6' list={credits} readOnly={readOnly}
					           field='credits' legend='Créditos'/>
					 <ItemList cols='12 6' list={debts} readOnly={readOnly} showStatus={true}
					           field='debts' legend='Débitos'/>
				 </div>
				 <div className="box-footer">
					 <button type="submit" className={`btn btn-${this.props.submitClass}`}>
						 {this.props.submitLabel}
					 </button>
					 <button type='button' className='btn btn-default' onClick={this.props.init}>
						 Cancelar
					 </button>
				 </div>
			 </form>
		)
	}
}

BillingCycleForm = reduxForm({form: FORM_BILLING_CYCLES, destroyOnUnmount: false})(BillingCycleForm);
const selector = formValueSelector(FORM_BILLING_CYCLES)

const mapStateToProps = state => ({
	credits: selector(state, 'credits'),
	debts: selector(state, 'debts')
})

const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm);
