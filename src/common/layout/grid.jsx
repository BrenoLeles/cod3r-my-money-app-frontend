import React, { Component } from 'react';

export default class Grid extends Component {
	
	toCssClasses(numeros) {
		const colunas = numeros ? numeros.split(' ') : [];
		let classes = '';
		
		if(colunas[0]) classes += `col-xs-${colunas[0]} `;
		if(colunas[1]) classes += `col-sm-${colunas[1]} `;
		if(colunas[2]) classes += `col-md-${colunas[2]} `;
		if(colunas[3]) classes += `col-lg-${colunas[3]} `;
		
		return classes;
	}
	
	render() {
		const gridClasses = this.toCssClasses(this.props.cols || '12');
		return (
			 <div className={gridClasses}>
				 {this.props.children}
			 </div>
		)
	}
}
