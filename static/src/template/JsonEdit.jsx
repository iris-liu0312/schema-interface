import React, { Component } from 'react';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';

export default class JSONEdit extends Component {
    constructor(props) {
        super(props);

        this.handleEvent = this.handleEvent.bind(this);
    }

    // sends JSON back to Viewer when field is out of focus
    handleEvent(node, event) {
        if (event.type === 'blur') {
            this.props.parentCallback(this.jsoneditor.get());
        }
    }

    componentDidMount() {
        const options = {
            mode: 'tree',
            enableTransform: false,
            onEvent: this.handleEvent,
            templates: [
                {
                    text: 'Event',
                    title: 'Insert Event',
                    field: '',
                    value: {
                        '@id': 'Events/10000/',
                        'name': '',
                        'isSchema': false,
                        'ta1explanation': '',
                        'description': '',
                        'comment': '',
                        'instanceOf': '@id',
                        'probParent': '@id',
                        'probChild': '@id',
                        'probability': 0.0,
                        'importance': 0.0,
                        'likelihood': 0.0,
                        'wd_node': ['wd:Q1234567', 'wdt:P1234567'],
                        'wd_label': '',
                        'wd_description': '',
                        'modality': ['generic', 'hedged', 'irrealis', 'negated'],
                        'participants': [],
                        'privateData': {
                            '@type': '',
                            'template': '',
                            'repeatable': false
                        }
                    }
                },
                {
                    text: 'Container',
                    title: 'Insert Container',
                    field: '',
                    value: {
                        '@id': 'Events/10000/Container:',
                        'name': 'Event outlinks',
                        'comment': 'container node',
                        'isSchema': false,
                        'children_gate': 'or',
                        'children': [],
                        'privateData': {
                            '@type': 'kairos:Container',
                            'template': '',
                            'repeatable': false
                        }
                    }
                },
                {
                    text: 'Container Event',
                    title: 'Insert Container Event',
                    field: '',
                    value: {
                        '@id': 'Events/10000/Container:',
                        'name': '',
                        'comment': 'container node',
                        'isSchema': false,
                        'ta1explanation': '',
                        'description': '',
                        'comment': '',
                        'instanceOf': '@id',
                        'probParent': '@id',
                        'probChild': '@id',
                        'probability': 0.0,
                        'importance': 0.0,
                        'likelihood': 0.0,
                        'wd_node': ['wd:Q1234567', 'wdt:P1234567'],
                        'wd_label': '',
                        'wd_description': '',
                        'modality': ['generic', 'hedged', 'irrealis', 'negated'],
                        'privateData': {
                            '@type': '',
                            'template': '',
                            'repeatable': false
                        },
                        'children_gate': 'or',
                        'children': []
                    }
                },
                {
                    text: 'Participant',
                    title: 'Insert Participant',
                    field: '',
                    value: {
                        '@id': 'Participants/20000/',
                        'roleName': 'consult_XPO',
                        'templateParticipant': '',
                        'entity': 'Entities/00001/'
                    }
                },
                {
                    text: 'Children',
                    title: 'Insert Children',
                    field: '',
                    value: {
                        'children_gate': 'or',
                        'children': [],
                    }
                },
                {
                    text: 'Child',
                    title: 'Insert Child',
                    field: '',
                    value: {
                        'child': 'Events/10000/Event',
                        'comment': 'name',
                        'optional': false,
                        'importance': 1,
                        'outlinks': []
                    }
                },
                {
                    text: 'Entity',
                    title: 'Insert Entity',
                    field: '',
                    value: {
                        '@id': 'Entities/20000/',
                        'name': '',
                        'aka': [],
                        'wd_node': 'wd:Q1234567',
                        'wd_label': '',
                        'wd_description': '',
                        'modality': ['generic', 'hedged', 'negated']                        
                    }
                },
                {
                    text: 'Relation',
                    title: 'Insert Relation',
                    field: '',
                    value: {
                        '@id': 'Relations/30000/',
                        'name': '',
                        'relationSubject': 'Entities/20000/',
                        'relationObject': 'Entities/20001/',
                        'wd_node': 'wdt:P1234567',
                        'wd_label': '',
                        'modality': ['negated', 'hedged'],
                        'wd_description': '',
                        'ta1ref': ''                     
                    }
                }
            ]
        };

        this.jsoneditor = new JSONEditor(this.container, options);
        this.jsoneditor.set(this.props.schemaJson);
    }

    componentWillUnmount() {
        if (this.jsoneditor) {
            this.jsoneditor.destroy();
        }
    }

    componentDidUpdate() {
        this.jsoneditor.update(this.props.schemaJson);
    }

    render() {
        return (
            <div id="schema-json" className="jsoneditor-react-container" ref={elem => this.container = elem} />
        );
    }
}