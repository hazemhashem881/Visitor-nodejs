pipeline {
    agent any
    stages {
        stage('Build & Push image') {
            steps {
                script {
                    sh "sed -i 's/latest/${BUILD_NUMBER}/' kaniko.yaml"
                    sh "kubectl apply -f kaniko.yml"
                }
            }
        }
        stage('Snyk Open Source Scan') {
            steps {
                echo 'Testing'
                snykSecurity(
                    snykInstallation: 'snyk@latest',
                    snykTokenId: 'snyk-api-toke',
                    failOnIssues: false,
                    monitorProjectOnBuild: true,
                    additionalArguments: '--all-projects --d'
                )
            }
        }
        stage('Snyk Code Scan') {
            steps {
                snykSecurity(
                    snykInstallation: 'snyk@latest',
                    snykTokenId: 'snyk-api-toke',
                    failOnIssues: false,
                    monitorProjectOnBuild: false,
                    additionalArguments: '--code -debug'
                )
            }
        }
        stage('Snyk Container Scan') {
            steps {
                snykSecurity(
                    snykInstallation: 'snyk@latest',
                    snykTokenId: 'snyk-api-toke',
                    failOnIssues: false,
                    monitorProjectOnBuild: true,
                    additionalArguments: '--container debian -debug'
                )
            }
        }
        
    }
}
