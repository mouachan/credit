angular
  .module("demo", [])
  .controller("call-dmn", function ($scope, $http) {
    var calcul_variables_endpoint = ENV.baseUrl+'/calcul_variables';
    var notation_endpoint = ENV.baseUrl+'/Orientation';

    $scope.notation = [ENV.baseUrl];
    var rentab_13;
    var strfin_36;
    var rentab_38;
    $scope.applicationResult = "";
    $scope.applicationResultIcon = "";
    $scope.displayResults = "display: none;";
    $scope.bilan = { gg: 10, ga: 20, hp: 30, hq: 40, fl: 50, fm: 6, hn: 3, gg1: 4, ga1: 16, hp1: 12, hq1: 3, fl1: 2, fm1: 1, fl2: 7, fm2: 5, ga2: 2, hn2: 34, dl: 5, ee: 5 };
    $scope.contrepartie = { siren: "1013B" };
    $scope.startProcess = function () {
      var startTime = new Date().getTime();
      var elapsedTime = 0;
      $scope.rules = [];
      $scope.notation = [];
      $scope.variables = [];
    $http.post( 
      calcul_variables_endpoint,
      '{"bilan" : {"gg":' + $scope.bilan.gg + ',"ga":' + $scope.bilan.ga + ',"hp":' + $scope.bilan.hp + ',"hq":' + $scope.bilan.hq + ',"fl":' + $scope.bilan.fl + ',"fm":' + $scope.bilan.fm + ',"gg1":' + $scope.bilan.gg1 + ',"ga1":' + $scope.bilan.ga1 + ',"hp1":' + $scope.bilan.hp1 + ',"hq1":' + $scope.bilan.hq1 + ',"fl1":' + $scope.bilan.fl1 + ',"fm1":' + $scope.bilan.fm1 + ',"hn":' + $scope.bilan.hn + ',"ga2":' + $scope.bilan.ga2 + ',"hn2":' + $scope.bilan.hn2 + ',"fl2":' + $scope.bilan.fl2 + ',"fm2":' + $scope.bilan.fm2 + ',"dl":' + $scope.bilan.dl + ',"ee":' + $scope.bilan.ee + '}}'
      ).then(function (response) {
      console.log("response :" + response.status);
      $scope.greeting = response.data;
      console.log("score.greeting "+$scope.greeting.value);
      if (response.status == 200) {
        // approved
        console.log("approved");
        // change label to approved
        $scope.displayResults = "";
        $scope.applicationResult = "Variables Calculées";
        $scope.applicationResultIcon = "pficon pficon-ok";
        // add comment to message
        rentab_13 = $scope.greeting.rentab_13;
        strfin_36 = $scope.greeting.strfin_36;
        rentab_38 = $scope.greeting.rentab_38;

       var rentab_13 = 9;
       var strfin_36 = 4;
       var data = '{"CodeNaf":"'+$scope.contrepartie.siren+'","Variables": [{ "valeur":'+ rentab_13 +',"type": "rentab_13"},{"valeur":'+strfin_36+',"type": "strfin_36"}],"rules":[]}}';

      $http.post(
        notation_endpoint,
          data).then(function (resp) {
        $scope.res = resp.data;
        console.log($scope.res);
        elapsedTime = new Date().getTime() - startTime;
        var msgTime = "Temps d'execution : "+elapsedTime+" ms";
        var msgContainer = "Version 1.0";
        $scope.version = "Version 1.0"
        $scope.msgTime =elapsedTime;
        var rules = $scope.res.rules;
        var decision_notation = $scope.res.Notation;
        var details = decision_notation.Detail;
        var var_0 = {type:"",valeur:0,score:0};
        var var_1 = {type:"",valeur:0,score:0};
        var_0.type  = details[0][1].type;
        var_0.valeur = details[0][1].valeur;
        var_0.score = details[0][0];
        var_1.type  = details[1][1].type;
        var_1.valeur = details[1][1].valeur;
        var_1.score = details[1][0];
        $scope.variables = [var_0,var_1];
        var typeAiguillage =  decision_notation.TypeAiguillage;
        var decoupageSectoriel = decision_notation.DecoupageSectoriel;
        console.log(typeAiguillage);
        if (typeAiguillage != "NON_NOTE") {
            // approved
            console.log("approved");
            // change label to approved
            $scope.displayResults = "";
            $scope.applicationResult = "Noté";
            $scope.applicationResultIcon = "pficon pficon-ok";
            var scoreFinal =  decision_notation.Score;
            var note =  decision_notation.Note;
            var orientation = decision_notation.Orientation;

            var msgType = "Modèle : "+typeAiguillage;
            var msgDecp = "Découpage : "+decoupageSectoriel;
            var msgScoreFinal = "Score : "+scoreFinal;
            var msgNote = "Note : "+note;
            var msgOrientation = "Orientation : "+orientation;
            $scope.notation = [msgType,msgScoreFinal,msgNote,msgOrientation];

            for (var i = 0; i < rules.length; i++) {
              $scope.rules.push(rules[i]);
             }
            console.log($scope.applicationResultMessages);
        } else {
            console.log("rejected");
            // rejected
            // change label to rejected
            $scope.displayResults = "";
            $scope.applicationResult = "Non Noté";
            $scope.applicationResultIcon = "pficon pficon-error-circle-o";
            // add comment to message
            $scope.version = msgContainer;
            $scope.notation = ["Non Elligibile à la notation"];
            $scope.rules.push(rules[0]);
            console.log($scope.applicationResultMessages);
        }


      });
    }
  });
}

})
