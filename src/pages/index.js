import React, { useState } from "react"
import YAML from 'yaml'
import { compare } from 'fast-json-patch'
import { Helmet } from "react-helmet"
import "../styles/main.scss"

export default function Home() {
  const [source, setSource] = useState("key: value");
  const [target, setTarget] = useState("key: newValue")
  const [result, setResult] = useState("")

  function handleSourceChange(e) {
    setSource(e.target.value)
  }

  function handleTargetChange(e) {
    setTarget(e.target.value)
  }

  function generatePatch() {
    const s = YAML.parse(source)
    const t = YAML.parse(target)
    const p = compare(s, t)
    setResult(YAML.stringify(p))
  }

  return <div>
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>YAML Patch Builder Online</title>
    </Helmet>
    <section className="section">
      <div className="container">
        <h1 className="title">YAML Patch Builder Online</h1>
        <h2 className="subtitle">You can use this tool to calculate the JSON Patch (<a href="http://tools.ietf.org/html/rfc6902">RFC6902</a>)
                needed to mutate a resource to a given state.</h2>

        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Source (current state)</label>
              <div className="control">
                <textarea className="textarea" value={source} onChange={handleSourceChange} />
                <p className="help">Insert here the current representation where you want to apply the Patch.</p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Target (desired state)</label>
              <div className="control">
                <textarea className="textarea" value={target} onChange={handleTargetChange} />
                <p className="help">Insert here how the Resource should be after apply the Patch.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <a className="button is-primary is-fullwidth" id="build" onClick={generatePatch}>Click to Build the Patch Document</a>
          </div>
        </div>
        <article className="message is-warning" id="alert-panel" style={{ display: "none" }}>
          <div className="message-header">
            <p>Warning</p>
          </div>
          <div className="message-body" id="alert-panel-body">
          </div>
        </article>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">YAML Patch Document</label>
              <div className="control">
                <textarea className="textarea" value={result} placeholder="Click the button to see the YAML Patch Result..." onClick="this.select();"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>Thanks</strong> to
            <a href="https://bulma.io"> BULMA</a>,
            <a href="https://github.com/eemeli/yaml"> YAML</a>, and
            <a href="https://github.com/Starcounter-Jack/JSON-Patch"> JSON-Patch</a> used to build this tool.
          </p>

          <p>
            The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php"> under MIT</a> and you can find it at
            <a href="https://github.com/tobernguyen/yaml-patch-generator"> GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
}
