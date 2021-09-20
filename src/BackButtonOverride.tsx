import * as React from 'react';

declare const manywho: any;

export default class BackButtonOverride extends React.Component<any,any> {

    constructor(props: any) {
        super(props);
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        window.addEventListener('popstate', this.back);
    }

    async componentWillUnmount() {
        window.removeEventListener('popstate', this.back);
    }

    async back(event: any) {
        let model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        if (model.attributes?.onBack && model.attributes.onBack.length > 0) {
            let outcomes: any = manywho.model.getOutcomes(this.props.id,this.props.flowKey);
            let backOutcome: any = outcomes.find((outcome: any) => outcome.value === model.attributes.onBack);
            if(backOutcome) {
                await manywho.component.onOutcome(backOutcome, null, this.props.flowKey);
            }
        }
    }

    render() {
        return (<div/>);
    }
}

manywho.component.register('FilePicker', BackButtonOverride);

