pipeline {
    agent any

        stage('Build image'){
            steps{
             sh "docker build -t hazemhashem100/visitor:${BUILD_NUMBER} ."
            }
        }
        stage('Push image ') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                    sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                    sh "docker push hazemhashem100/visitor:${BUILD_NUMBER}"
                }
                
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
