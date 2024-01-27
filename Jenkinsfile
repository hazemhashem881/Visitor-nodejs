pipeline {
    agent any

    stages {
        stage('Checkout') {
        stage('Snyk Scan') {
            steps {
                script {
                    def snykOptions = [
                        snykToken: credentials('snyk-api-toke'), // Create a Jenkins credential for your Snyk API token
                        additionalArguments: '--all-projects' // Additional Snyk CLI arguments
                    ]

                    // Run Snyk security scan
                    snykSecurityScan snykInstallation: 'Snyk CLI', snykOptions: snykOptions
                }
            }
        }
    }

    post {
        failure {
            // Define actions to be taken if the build fails due to vulnerabilities
            echo 'Snyk scan found vulnerabilities'
        }
    }
}
