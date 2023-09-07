import { Verifier } from '@pact-foundation/pact';
import { before, describe, it } from 'mocha';
import http from 'http';
import path from 'path';

const pactFile = path.resolve(`./pacts/react-client-usuario-service.json`);
let port;
let opts;
describe("Pact Verification", () => {
    before(async () => {
        port = 5135;
        opts = {
            provider: "usuario-service",
            providerBaseUrl: `http://localhost:${port}`,
            logLevel: "info",
            pactUrls: [pactFile],
            agent: http.Agent({keepAlive: true})

        };
    });
    it("Valida lo que espera el API del Cliente", () => {
        
        console.log(opts)
        return new Verifier(opts)
            .verifyProvider()
            .then((output) => {
                console.log("Pact Verification Complete!");
                console.log(output);
            })
            .catch((e) => {
                console.error("Pact verification failed :(", e);
            });
    });

});
