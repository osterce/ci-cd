pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'textil-app'
        DOCKER_TAG = 'latest'
        CONTAINER_NAME = 'react-container'
        // Definimos la ruta de Homebrew aquí de forma segura
        PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
    }
    
    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Version control') {
            steps {
                git branch: "main", url:'https://github.com/osterce/ci-cd'
            }
        }
        stage('Install dependencies') {
            steps {
                // Ahora sh debería funcionar porque está en /bin o /usr/bin
                sh "npm install"
            }
        }
        stage('Build') {
            steps {
                sh "npm run build"
            }
        }
        stage('Desplegar en Docker') {
            steps {
                script {
                    // Usamos rutas absolutas o el PATH corregido
                    sh "docker version"
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }
    post{
        failure{
            emailext(
                subject: "Project Name: ${JOB_NAME} - Pipeline Status: ${BUILD_NUMBER}",
                body: ''' <html>
                            <body>
                                <p>Build Status: ${BUILD_STATUS}</p>
                                <p>Build Number: ${BUILD_NUMBER}</p>
                                <p>Check the <a href="${BUILD_URL}">console output</a> to view the results.</p>
                            </body>
                        </html>''',
                to: 'osterce@gmail.com',
                from: 'ozterce84@gmail.com',
                mimeType: 'text/html'
            )
        }
    }
}