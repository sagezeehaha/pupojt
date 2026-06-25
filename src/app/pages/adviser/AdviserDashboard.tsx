import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOJT } from '../../context/OJTContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Users,
  Clock,
  FileCheck,
  Award,
  ArrowRight,
  ChevronRight,
  Calendar,
  AlertTriangle,
  ClipboardList
} from 'lucide-react';

export function AdviserDashboard() {
  const { user } = useAuth();
  const { students } = useOJT();
  const navigate = useNavigate();

  // Filter student profiles assigned to this adviser
  const assignedStudents = students.filter(s => s.adviserId === user?.id || s.adviserName === user?.name);

  // Compute metrics
  const totalCount = assignedStudents.length;

  // Pending approvals
  let pendingTaskCount = 0;
  let pendingJournalCount = 0;
  let pendingPortfolioCount = 0;
  let completedHoursCount = 0;

  assignedStudents.forEach(s => {
    pendingTaskCount += s.dailyTasks.filter(t => t.status === 'Submitted').length;
    pendingJournalCount += s.weeklyJournals.filter(j => j.status === 'Submitted').length;
    if (s.portfolioSubmitted && !s.portfolioApproved) {
      pendingPortfolioCount++;
    }
    if (s.totalHoursRendered >= s.requiredHours) {
      completedHoursCount++;
    }
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Adviser Welcome */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Faculty Portal</span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">Hello, Prof. {user?.name}!</h1>
          <p className="text-slate-350 text-sm mt-1 font-light">
            Monitor and endorse clearances for your assigned OJT section groups.
          </p>
        </div>
        <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 text-xs">
          <p className="text-slate-350">Academic Oversight:</p>
          <p className="font-bold text-slate-100 text-sm mt-0.5">Section BSIT 4A & BSCpE 4A</p>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Interns */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              Assigned Interns
              <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                <Users className="h-4.5 w-4.5 text-blue-600" />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-extrabold text-slate-900">{totalCount}</span>
                <span className="text-xs text-slate-500 font-medium ml-1">students</span>
              </div>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none font-bold">+2 New</Badge>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 font-medium">Monitoring BSIT and BSCpE cohorts</p>
          </CardContent>
        </Card>

        {/* Pending Journals */}
        <Card className="shadow-sm border-slate-200 flex flex-col">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              Pending Journals
              <div className="h-8 w-8 rounded-md bg-amber-100 flex items-center justify-center">
                <Clock className="h-4.5 w-4.5 text-amber-600" />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div>
              <span className="text-3xl font-extrabold text-slate-900">{pendingJournalCount}</span>
              <span className="text-xs text-slate-500 font-medium ml-1">to review</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 mb-3 font-medium">Weekly journal submission requires validation</p>
            <div className="mt-auto flex items-center justify-between">
              {pendingJournalCount > 0 ? (
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none text-[10px] font-bold">
                  Needs Review
                </Badge>
              ) : <span />}
              {/* Changed color from amber to maroon */}
              <Button size="sm" onClick={() => navigate('/adviser/journals')} className="h-7 px-2 text-[10px] bg-[#800000] hover:bg-[#600000] text-white font-semibold">
                Review Now <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Completed Hours */}
        <Card className="shadow-sm border-slate-200 flex flex-col">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              Hours Completed
              <div className="h-8 w-8 rounded-md bg-emerald-100 flex items-center justify-center">
                <FileCheck className="h-4.5 w-4.5 text-emerald-600" />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div>
              <span className="text-3xl font-extrabold text-slate-900">{completedHoursCount}</span>
              <span className="text-xs text-slate-500 font-medium ml-1">intern met 480 hrs</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 mb-2 font-medium">Internship requirement completed</p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
            <div className="mt-auto text-right">
              <Button size="sm" variant="outline" className="h-7 text-[10px] text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-semibold">
                Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Portfolios for Review */}
        <Card className="shadow-sm border-slate-200 flex flex-col">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              Portfolio Reviews
              <div className="h-8 w-8 rounded-md flex items-center justify-center" style={{ backgroundColor: '#ede0e2' }}>
                <Award className="h-4.5 w-4.5 text-[#6b1d2a]" />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div>
              <span className="text-3xl font-extrabold text-slate-900">{pendingPortfolioCount}</span>
              <span className="text-xs text-slate-500 font-medium ml-1">waiting</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 mb-3 font-medium">Student portfolio pending endorsement</p>
            <div className="mt-auto flex items-center justify-between">
              {pendingPortfolioCount > 0 ? (
                <Badge className="bg-[#800000] text-white hover:bg-[#800000] border-none text-[10px] font-bold rounded-full px-3">
                  Awaiting Endorsement
                </Badge>
              ) : <span />}
              {/* Changed color from amber to maroon */}
              <Button size="sm" onClick={() => navigate('/adviser/portfolio')} className="h-7 px-2 text-[10px] bg-[#800000] hover:bg-[#600000] text-white font-semibold">
                Review Now <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Task Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Actions Feed */}
        <Card className="lg:col-span-2 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-800">Pending Review Queue</CardTitle>
            <CardDescription>Actions requiring your review and endorsement signature.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            {pendingJournalCount === 0 && pendingPortfolioCount === 0 && pendingTaskCount === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                All queues clear! No pending submissions.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {assignedStudents.map((s) => {
                  const sTasks = s.dailyTasks.filter(t => t.status === 'Submitted');
                  const sJournals = s.weeklyJournals.filter(j => j.status === 'Submitted');
                  const needsPortfolio = s.portfolioSubmitted && !s.portfolioApproved;

                  if (sTasks.length === 0 && sJournals.length === 0 && !needsPortfolio) return null;

                  return (
                    <div key={s.studentId} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{s.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{s.program} | {s.section}</p>
                      </div>
                      <div className="flex gap-2.5 items-center">
                        {sTasks.length > 0 && (
                          <Badge variant="outline" className="text-[10px] font-semibold text-blue-600 border-blue-200 bg-blue-50">
                            {sTasks.length} Daily Logs
                          </Badge>
                        )}
                        {sJournals.length > 0 && (
                          <Badge variant="outline" className="text-[10px] font-semibold text-amber-700 border-amber-200 bg-amber-50">
                            {sJournals.length} Weekly Journals
                          </Badge>
                        )}
                        {needsPortfolio && (
                          <Badge className="text-[10px] font-semibold text-[#6b1d2a] border border-[#6b1d2a] rounded-full px-3" style={{ backgroundColor: '#ede0e2' }}>
                            Portfolio Submission
                          </Badge>
                        )}
                        {/* Changed color from amber to maroon */}
                        <Button
                          size="sm"
                          onClick={() => {
                            if (sJournals.length > 0) navigate('/adviser/journals');
                            else if (needsPortfolio) navigate('/adviser/portfolio');
                            else navigate('/adviser/tasks');
                          }}
                          className="bg-[#800000] hover:bg-[#600000] text-white text-[10px] h-7 px-2 font-semibold"
                        >
                          Review Now <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick links to monitors */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-800">Quick Navigation</CardTitle>
            <CardDescription>Shortcut access to monitoring panels.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              onClick={() => navigate('/adviser/students')}
              className="w-full text-xs h-11 border-slate-200 text-slate-700 flex justify-between items-center px-4 hover:bg-slate-50 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-500" />
                Student Monitoring Board
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/adviser/attendance')}
              className="w-full text-xs h-11 border-slate-200 text-slate-700 flex justify-between items-center px-4 hover:bg-slate-50 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                Attendance Monitor Calendar
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/adviser/evaluation')}
              className="w-full text-xs h-11 border-slate-200 text-slate-700 flex justify-between items-center px-4 hover:bg-slate-50 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4 text-slate-500" />
                Intern Midterm & Final Grades
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}