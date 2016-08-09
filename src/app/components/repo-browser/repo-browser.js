System.register(['angular2/core', 'angular2/router', '../repo-list/repo-list', '../repo-detail/repo-detail', '../../services/github'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, repo_list_1, repo_detail_1, github_1;
    var RepoBrowser;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (repo_list_1_1) {
                repo_list_1 = repo_list_1_1;
            },
            function (repo_detail_1_1) {
                repo_detail_1 = repo_detail_1_1;
            },
            function (github_1_1) {
                github_1 = github_1_1;
            }],
        execute: function() {
            RepoBrowser = (function () {
                function RepoBrowser(router, github) {
                    this.router = router;
                    this.github = github;
                }
                RepoBrowser.prototype.searchForOrg = function (orgName) {
                    var _this = this;
                    this.github.getOrg(orgName)
                        .subscribe(function (_a) {
                        var name = _a.name;
                        console.log(name);
                        _this.router.navigate(['RepoList', { org: orgName }]);
                    });
                };
                RepoBrowser = __decorate([
                    core_1.Component({
                        selector: 'repo-browser',
                        templateUrl: 'app/components/repo-browser/repo-browser.html',
                        styleUrls: ['app/components/repo-browser/repo-browser.css'],
                        providers: [github_1.Github],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        pipes: []
                    }),
                    router_1.RouteConfig([
                        new router_1.Route({ path: '/:org', component: repo_list_1.RepoList, name: 'RepoList' }),
                        new router_1.Route({ path: '/:org/:name', component: repo_detail_1.RepoDetail, name: 'RepoDetail' })
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, github_1.Github])
                ], RepoBrowser);
                return RepoBrowser;
            }());
            exports_1("RepoBrowser", RepoBrowser);
        }
    }
});
