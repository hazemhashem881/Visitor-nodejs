pipeline {
 agent any
    stages {
     
        stage('build'){
            steps{
             sh "docker build -t hazemhashem100/vistito:${BUILD_NUMBER} ."
            }
        }
        stage('push ') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                    sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                    sh "docker push hazemhashem100/vistito:${BUILD_NUMBER}"
                }
                
            }
        }
        stage('cd'){
            steps{
             script {
                    def container_name = 'vistito' // Replace with the name of your container
                    def container_ids = sh(script: "docker ps --format '{{.ID}} {{.Names}}' | grep ${container_name} | awk '{print \$1}'", returnStdout: true).trim()
                    if (container_ids.isEmpty()) {
                        echo "No running containers found with name '${container_name}'"
                    } else {
                        sh 'docker rm -vf $(docker ps -aq)'
                    }
                }
             
             sh  "docker run -d -p 3000:3000 --name=vistito hazemhashem100/vistito:${BUILD_NUMBER}"
              
            }
        }
        
    }
}
