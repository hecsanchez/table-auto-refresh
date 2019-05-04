import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';

import { Table, Button } from 'components';
import { config, createNewCandidate } from 'utils';

const override = css`
    display: block;
    margin: 0 auto;
`;

export class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            entries: [],
            error: '',
            loading: true,
            autoRefresh: false,
            newData: []
        }

        this.interval = null;
    }

    componentDidMount() {
        window.gapi.load("client", this.initClient);
    }

    initClient = () => {
        window.gapi.client
            .init({
                apiKey: config.apiKey,
                discoveryDocs: config.discoveryDocs
            })
            .then(() => {
                this.loadGAPI();
            });
    };

    loadGAPI = () => {
        window.gapi.client.load("sheets", "v4", () => {
          this.fetchEntries();
        });
    }

    fetchEntries = () => {
        window.gapi.client.sheets.spreadsheets.values
            .get({
              spreadsheetId: config.spreadsheetId,
              range: "'Form Responses 2'!A2:E"
            })
            .then(response => {
                const data = response.result.values;
                const entries = this.getEntries(data);

                if (this.state.autoRefresh 
                    && this.state.newEntries 
                    && this.state.newEntries.length > 0) {
                    this.pushNewCandidate()
                }

                this.onLoad({ entries });
            });
    }

    onLoad = (data, error) => {
        if (data) {
            const entries = data.entries;
            this.setState({ 
                entries, 
                loading: false, 
                newEntries: [] 
            });
        } else {
            this.setState({ error });
        }
    };

    startAutoRefresh = () => {
        this.interval = setInterval(this.fetchEntries, 60 * 1000);
        this.setState({ autoRefresh: true });
    }

    stopAutoRefresh = () => {
        clearInterval(this.interval);
        this.setState({ autoRefresh: false });
    }

    pushNewCandidate = () => {
        this.state.newEntries.map(newEntry => {
            const body = {
                first_name: newEntry[1],
                last_name: newEntry[2],
                email: newEntry[3],
                user_phone_number: newEntry[4]
            }
            createNewCandidate(body)
            return body;
        });
    }

    getEntries = (data) => (data.map((entry, index) => {
        if (this.state.autoRefresh && entry && !this.state.entries[index]) {
            const newEntries = this.state.newEntries;
            newEntries.push(entry);
            this.setState({ newEntries })
        }

        const entryData = {
            createdDate: entry[0],
            name: entry[1],
            surname: entry[2],
            email: entry[3],
            number: entry[4]
        }

        return entryData;
    }) || [])
    
    render() {
        const { entries } = this.state;

        return (
            <div className="wrapper">
                { !this.state.loading && 
                    <Fragment>
                        <Button 
                            text="Start Auto Refresh"
                            style={{  }}
                            color="green"
                            disabled={this.state.autoRefresh}
                            onClick={this.startAutoRefresh}
                        />
                        <Button 
                            text="Stop Auto Refresh"
                            style={{  }}
                            color="red"
                            disabled={!this.state.autoRefresh}
                            onClick={this.stopAutoRefresh}
                        />
                        <Table 
                            data={ entries }
                        />
                    </Fragment>
                }
                
                <PacmanLoader
                    css={override}
                    sizeUnit={"px"}
                    size={25}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

Home.propTypes = {
    data: PropTypes.array
};