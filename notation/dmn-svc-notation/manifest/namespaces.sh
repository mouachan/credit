
oc new-project notation-svc-dev --display-name="Dev" —description="dev"
oc new-project notation-svc-acp --display-name="Testing" —description="test"
oc new-project notation-svc-lab --display-name="Production" --description="production"
oc new-project notation-svc-cicd --display-name="CICD" --description="CICD environment"
oc project notation-svc-cicd 
#oc new-app jenkins-ephemeral
#oc create bc -f notation-svc-cicd-bc.yml