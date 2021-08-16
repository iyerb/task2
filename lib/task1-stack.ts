import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';
import { MyChart } from './my-chart'; 
import * as cdk8s from 'cdk8s';

const LAB_KEYPAIR_NM = 'lab-key-pair';
export class Task1Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const keyname = new cdk.CfnParameter(this, 'KeyName', {
      type: 'String',
      default: LAB_KEYPAIR_NM
  })   

    // The code that defines your stack goes here
    const jamcluster = new eks.Cluster(this,'JamEksCluster',{
      version: eks.KubernetesVersion.V1_18,
      defaultCapacity: 1,
    })
    new cdk.CfnOutput(this, 'Key Name', { value: LAB_KEYPAIR_NM })
    new cdk.CfnOutput(this, 'eks-cluster-name', { value: jamcluster.clusterName })
    

    /**
     * Code to add pods on eks cluster. All containers are define in MyChart
     */
    jamcluster.addCdk8sChart('my-chart', new MyChart(new cdk8s.App(), 'MyChart'));
    
    new cdk.CfnOutput(this, 'deployedpods', { value: '5' })
    new cdk.CfnOutput(this, 'services', { value: '5' })
  }
}
