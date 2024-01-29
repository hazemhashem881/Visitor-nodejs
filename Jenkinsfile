pipeline {
    agent any
    stages {
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
        stage('Build & Push image') {
            steps {
                script {
                    sh "sed -i 's/latest/v${BUILD_NUMBER}/' kaniko.yaml"
                    sh "kubectl apply -f kaniko.yaml"
                }
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
                    additionalArguments: '--container hazemhashem100/vistor:${BUILD_NUMBER} -debug'
                )
            }
        }
        

        stage('CD') {
            steps {
                sh "sed -i 's/latest/v${BUILD_NUMBER}/' appdeploy.yml "
                sh "kubectl apply -f namespace.yml"
                sh "kubectl apply -f appdeploy.yml"
            }
        }
    }
}
