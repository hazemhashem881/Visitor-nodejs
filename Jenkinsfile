pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'hazemhashem100/visitor'
        IMAGE_TAG = "${DOCKER_IMAGE}:${BUILD_NUMBER}"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }

    stages {
        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Authenticate with Docker Hub
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        // Build Docker image
                        docker.build(IMAGE_TAG, '-f Dockerfile .')

                        // Push Docker image to Docker Hub
                        docker.image(IMAGE_TAG).push()
                    }
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
