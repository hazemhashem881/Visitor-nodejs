pipeline {
    agent any
    stages {
 
        stage('Snyk Container Scan') {
            steps {
                snykSecurity(
                    snykInstallation: 'snyk@latest',
                    snykTokenId: 'snyk-api-toke',
                    failOnIssues: false,
                    monitorProjectOnBuild: true,
                    additionalArguments: '--container hazemhashem100/vistor:3 -debug'
                )
            }
        }
        
    }
}
