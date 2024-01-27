pipeline {
    agent any

    stages {
        stage('Snyk Scan') {
            steps {
                echo 'Testing'
                snykSecurity(
                    snykInstallation: 'snyk@latest',
                    snykTokenId: 'snyk-api-toke',
                    failOnIssues: false,
                    monitorprojectOnBuild: true,
                    additionalArguments: '--all-projects --d'
                )
            }
        }
    }
}
