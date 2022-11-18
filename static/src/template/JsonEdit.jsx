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
                        'comment': '',
                        'isSchema': false,
                        'optional': false,
                        'description': '',
                        'wd_node': ['wd:Q1234567', 'wdt:P1234567'],
                        'wd_label': '',
                        'wd_description': '',
                        'modality': ['generic', 'hedged', 'irrealis', 'negated'],
                        'participants': [],
                        'likelihood': [
                            {
                                'probParent': '@id',
                                'probChild': '@id',
                                'probability': 0.0
                            },
                        ],
                        'importance': [
                            {
                                'probParent': '@id',
                                'probChild': '@id',
                                'probability': 0.0
                            }
                        ],
                        'outlink': []
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
                        'optional': false,
                        'children_gate': 'xor',
                        'children': [],
                        'outlink': []
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
                        'optional': false,
                        'description': '',
                        'wd_node': ['wd:Q1234567', 'wdt:P1234567'],
                        'wd_label': '',
                        'wd_description': '',
                        'children_gate': 'or',
                        'modality': ['generic', 'hedged', 'irrealis', 'negated'],
                        'children': [],
                        'likelihood': [
                            {
                                'probParent': '@id',
                                'probChild': '@id',
                                'probability': 0.0
                            },
                        ],
                        'importance': [
                            {
                                'probParent': '@id',
                                'probChild': '@id',
                                'probability': 0.0
                            }
                        ],
                        'outlink': []
                    }
                },
                {
                    text: 'Participant',
                    title: 'Insert Participant',
                    field: '',
                    value: {
                        '@id': 'Participants/20000/',
                        'roleName': 'consult_XPO',
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
                        'comment': '',
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
                        'wd_node': 'wd:Q1234567',
                        'wd_label': '',
                        'wd_description': ''                     
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
                        'wd_description': ''                   
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